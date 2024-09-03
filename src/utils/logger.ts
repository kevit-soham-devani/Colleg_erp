// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';
import { createLogger, transports, format } from 'winston';

const logger = createLogger({
	transports: [new transports.Console({ level: 'silly' })],
	format: format.combine(
		format.timestamp(),
		format.colorize(),
		format.printf(
			({ timestamp, level, message }) =>
				`[${timestamp}] ${level}: ${message}`,
		),
	),
});

const morganformat =
	'[:date[iso]] :method :url :status :res[content-length] - :response-time ms';
export const morganInstance = morgan(morganformat);

export const log = logger;
