const Project = require("../models/Projects");
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const aws = require("aws-sdk");

exports.createProject = (req, res, next) => {
    const projectObject = req.body;

    if (!req.file) {
        // Vérification si un fichier a été téléchargé
        return res
            .status(400)
            .json({ error: "Aucun fichier n'a été téléchargé." });
    }

    sharp(req.file.buffer)
        .resize(960, 540)
        .toBuffer()
        .then(async (outputBuffer) => {
            // Create new instance of S3
            const s3 = new aws.S3();

            // Define parameters for S3
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: req.file.originalname,
                Body: outputBuffer,
                ACL: "public-read", // Set ACL to make the object public
            };

            // Upload image to S3
            const s3UploadResult = await s3.upload(params).promise();

            // Create new project
            const project = new Project({
                ...projectObject,
                image: s3UploadResult.Location,
                skills: JSON.parse(req.body.skills),
            });

            // Upload my project to my database MongoDB
            project
                .save()
                .then(() => {
                    res.status(201).json({ message: "Project saved!" });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({
                        error: "Erreur interne du serveur",
                    });
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        });
};

exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ error: "Project not found !" });
        }

        // Get the key of image
        const key = project.image.split("/").pop();

        // Create new instance of S3
        const s3 = new aws.S3();

        // Define parameters for S3
        const s3Params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: decodeURI(key)
        };

        // Delete image from S3
        s3.deleteObject(s3Params).promise();

        // Delete project from database MongoDB
        await Project.deleteOne({ _id: req.params.id });

        console.log("The object " + key + " was deleted !");

        res.status(200).json({
            message: "Project deleted !",
        });
    } catch (error) {
        console.log("Unable to delete object: " + error);
        res.status(500).json({ error });
    }
};

exports.getOneProject = (req, res, next) => {
    Project.findOne({ _id: req.params.id })
        .then((project) => {
            res.status(200).json(project);
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.getProjects = (req, res, next) => {
    Project.find()
        .then((projects) => res.status(200).json(projects))
        .catch((error) => res.status(400).json({ error }));
};

exports.modifyProjects = (req, res, next) => {
    Project.findById(req.params.id).then(async (project) => {
        if (project) {
            // Get the key of image
            const filename = project.image.split("/").pop();

            // Vérifiez si un nouveau fichier est téléchargé
            if (req.file) {
                // Resize image
                sharp(req.file.buffer)
                    .resize(960, 540)
                    .toBuffer()
                    .then(async (outputBuffer) => {
                        // Supprime l'ancienne image
                        const s3 = new aws.S3();

                        // Define parameters for S3
                        let s3Params = {
                            Bucket: process.env.AWS_BUCKET_NAME,
                            Key: filename,
                        };

                        // Delete image from S3
                        s3.deleteObject(s3Params).promise();

                        s3Params = {
                            Bucket: process.env.AWS_BUCKET_NAME,
                            Key: req.file.originalname,
                            Body: outputBuffer,
                            ACL: "public-read", // Set ACL to make the object public
                        };

                        // Upload new image
                        const s3Upload = await s3.upload(s3Params).promise();

                        // Update the project object
                        const projectObject = {
                            ...req.body,
                            image: s3Upload.Location,
                            skills: JSON.parse(req.body.skills),
                        };

                        Project.updateOne(
                            { _id: req.params.id },
                            { ...projectObject, _id: req.params.id }
                        )
                            .then(() =>
                                res
                                    .status(200)
                                    .json({ message: "Projet modifié !" })
                            )
                            .catch((error) => res.status(400).json({ error }));
                    });
            } else {
                // Aucun nouveau fichier téléchargé, mettez à jour le projet sans modifier l'image
                console.log("Pas d'image");
                const projectObject = {
                    ...req.body,
                    image: project.image,
                    skills: JSON.parse(req.body.skills),
                };

                Project.updateOne(
                    { _id: req.params.id },
                    { ...projectObject, _id: req.params.id }
                )
                    .then(() =>
                        res.status(200).json({ message: "Projet modifié !" })
                    )
                    .catch((error) => res.status(400).json({ error }));
            }
        } else {
            res.status(404).json({ error: "Projet non trouvé" });
        }
    });
};
