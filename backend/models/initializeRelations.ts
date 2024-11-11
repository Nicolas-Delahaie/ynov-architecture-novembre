import { T_Model } from "./";

type T_Models = {
    Raspberry: T_Model;
    ServerPort: T_Model;
    RaspberryPort: T_Model;
};

export const initializeRelations = (models: T_Models) => {
    const { Raspberry, ServerPort, RaspberryPort } = models;

    // ServerPort.hasOne(RaspberryPort);
    // RaspberryPort.hasOne(ServerPort);
};
