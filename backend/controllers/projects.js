const Project = require("../models/Projects");
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

exports.createProject = (req, res, next) => {
    const projectObject = req.body;

    if (!req.file) {
        // Vérification si un fichier a été téléchargé
        return res
            .status(400)
            .json({ error: "Aucun fichier n'a été téléchargé." });
    }

    const sourcePath = req.file.path;
    console.log(sourcePath);

    sharp(sourcePath)
        .resize(960, 540)
        .toBuffer()
        .then((outputBuffer) => {
            fs.writeFileSync(sourcePath, outputBuffer); // Écrase le fichier source
            const project = new Project({
                ...projectObject,
                image: `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                }`,
                skills: JSON.parse(req.body.skills),
            });

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

exports.deleteProject = (req, res, next) => {
    Project.findOne().then((project) => {
        const filename = project.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
            Project.deleteOne({ _id: req.params.id })
                .then(() => {
                    console.log(
                        `The project ${req.params.title} has been delete !`
                    );
                    res.status(200).json({ message: "Project delete ! " });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
        });
    });
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
    const projectObject = req.file
        ? {
              ...JSON.parse(req.body.project),
              image: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };

    Project.updateOne(
        { _id: req.params.id },
        { ...projectObject, _id: req.params.id }
    )
        .then(() => res.status(200).json({ message: "Project modified !" }))
        .catch((error) => res.status(400).json({ error }));
};
