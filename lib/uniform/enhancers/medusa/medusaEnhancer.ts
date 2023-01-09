import {
  createEnhancer,
  MedusaClient,
  MEDUSA_PARAMETER_TYPES,
} from "@uniformdev/canvas-medusa";
import { compose } from "@uniformdev/canvas";
import { EnhancerDefinition } from "../types";
import { validateAndGetEnvVars } from "../utils";

export const enhancerDefinition: EnhancerDefinition = {
  name: "Medusa",
  getConfiguration,
  getEnhancer,
  parameterTypes: MEDUSA_PARAMETER_TYPES,
};

function getConfiguration() {
  return validateAndGetEnvVars(["MEDUSA_BACKEND_URL"]);
}

async function getEnhancer() {
  const { envVars } = getConfiguration();

  const client = new MedusaClient({
    backendUrl: envVars.MEDUSA_BACKEND_URL,
  });

  return compose(
    createEnhancer({
      clients: client,
    }),
    arrayFlattener
  );
}

// if there is only one product in array, return the single object
const arrayFlattener = ({ parameter }: { parameter }) => {
  if (Array.isArray(parameter.value) && parameter.value.length === 1) {
    return parameter.value[0];
  }
  return parameter.value;
};
