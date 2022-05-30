import { Router } from "express";
import autoCatch from "@/utils/errors/autoCatch";
import { addMovie, getMovie } from "./movies.service";

const router = Router();

router.route("/").get(autoCatch(getMovie)).post(autoCatch(addMovie));

export default router;
