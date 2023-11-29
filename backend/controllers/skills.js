const Skill = require("../models/Skills");
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
        const s3 = new aws.S3();
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.file.originalname,
            Body: req.file.buffer,
        };

        const s3UploadResult = await s3.upload(params).promise();

        console.log(req);
        console.log(req.protocol);
        console.log(req.get("host"));

        const skill = new Skill({
            ...skillObject,
            image: `${req.protocol}://${req.get("host")}/images/${
                s3UploadResult.Key
            }`,
        });

        await skill
            .save()
            .then(() => res.status(201).json({ message: "Skill enregistré !" }))
            .catch((error) => res.status(400).json({ error }));
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.deleteSkill = (req, res, next) => {
    Skill.findOne().then((skill) => {
        const filename = skill.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
            Skill.deleteOne({ _id: req.params.id })
                .then(() => {
                    console.log("L'image " + filename + " à été supprimé !");
                    res.status(200).json({
                        message: "Objet supprimé !",
                    });
                })
                .catch((error) => res.status(400).json({ error }));
        });
    });
};

exports.deleteAllSkills = (req, res, next) => {
    Skill.find()
        .then((skills) => {
            skills.forEach((skill) => {
                const filename = skill.image.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    Skill.deleteOne({ _id: skill._id })
                        .then(() => {
                            console.log(
                                "L'image " + filename + " à été supprimé !"
                            );
                        })
                        .catch((error) => res.status(400).json({ error }));
                });
            });
            res.status(200).json({
                message: "Objets supprimés !",
            });
        })
        .catch((error) => res.status(400).json({ error }));
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
