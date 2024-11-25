import { initializeRelations } from "./initializeRelations";
import { Raspberry, initModel as initModel1 } from "./raspberry";
import { RaspberryPort, initModel as initModel2 } from "./raspberryPort";
import { ServerPort, initModel as initMode3 } from "./serverPort";
import { Sequelize, ModelCtor, Model } from "sequelize";

export type T_Model = ModelCtor<Model<any, any>>;

const sequelize = new Sequelize("archi", "root", "root", {
    host: "mysql",
    dialect: "mysql",
});

initModel1(sequelize);
initModel2(sequelize);
initMode3(sequelize);

initializeRelations({ Raspberry, RaspberryPort, ServerPort });

export { sequelize, Raspberry, RaspberryPort, ServerPort };
