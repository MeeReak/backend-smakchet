import path from "path";
import winston from "winston";

const { combine, timestamp, printf, colorize, align } = winston.format;

//create a winston logger
export const logger = winston.createLogger({
  defaultMeta: { service: "api-gateway-service" },

  // Add a timestamp to each log message & format in JSON
  format: combine(
    colorize({ all: true }),
    timestamp(),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [],
});

export const logInit = ({
  env,
  logLevel,
}: {
  env: string | undefined;
  logLevel: string | undefined;
}) => {
  // Output Logs to the Console (Unless it's Testing)

  logger.add(
    new winston.transports.Console({
      level: logLevel,
      silent: env === "testing",
    })
  );

  if (env !== "development") {
    logger.add(
      new winston.transports.File({
        level: logLevel,
        filename: path.join(__dirname, "../../logs/auth-service.log"),
      })
    );
  }
};

export const logDestroy = () => {
  logger.clear();
  logger.close();
};
