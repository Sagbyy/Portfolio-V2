const Skill = require("../models/Skills");
const { uuid } = require("uuidv4");
const fs = require("fs");
const aws = require("aws-sdk");

exports.createSkill = async (req, res, next) => {
    if (!req.file) {
        // Vérification si un fichier a été téléchargé
        return res
            .status(400)
            .json({ error: "Aucun fichier n'a été téléchargé." });
    }

    const skillObject = req.body;

    try {
        // Create new instance of S3
        const s3 = new aws.S3();

        // Get the file extension
        const fileExtension = req.file.originalname.split(".").pop();

        // Define parameters for S3
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.file.originalname,
            Body: req.file.buffer,
            ACL: "public-read", // Set ACL to make the object public
            ContentType: fileExtension == "svg" ? "image/svg+xml" : "image/png",
        };

        // Upload image to S3
        const s3UploadResult = await s3.upload(params).promise();

        // Create new skill
        const skill = new Skill({
            ...skillObject,
            image: s3UploadResult.Location,
        });

        await skill
            .save()
            .then(() => res.status(201).json({ message: "Skill enregistré !" }))
            .catch((error) => res.status(400).json({ error }));
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.deleteSkill = async (req, res, next) => {
    try {
        // Find skill in database by id
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({ error: "Skill not found !" });
        }

        // Get the key of image
        const key = skill.image.split("/").pop();

        // Create new instance of S3
        const s3 = new aws.S3();

        // Define parameters for S3
        const s3Params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: decodeURI(key),
        };

        // Delete image from S3
        s3.deleteObject(s3Params).promise();

        // Delete skill from database
        await Skill.deleteOne({ _id: req.params.id });
        console.log("The object " + key + " was deleted !");
        res.status(200).json({
            message: "Object deleted !",
        });
    } catch (error) {
        console.log("Unable to delete object: " + error);
        res.status(500).json({ error });
    }
};

exports.getAllSkills = (req, res, next) => {
    Skill.find()
        .then((skills) => res.status(200).json(skills))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOneSkill = (req, res, next) => {
    Skill.findOne({ _id: req.params.id })
        .then((skill) => res.status(200).json(skill))
        .catch((error) => res.status(404).json({ error }));
};
