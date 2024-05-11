import { fromError } from "zod-validation-error";

const validateData = (schemaZod) => (req, res, next) => {
  try {
    schemaZod.parse(req.body);
    next();
  } catch (error) {
    const validationError = fromError(error);
    res.status(400).json({ error: validationError.toString() });
  }
};

export default validateData;
