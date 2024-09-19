/**Config.ts */
interface ConfigType {
	server: {
		port: number | string;
	};
	mongodb: {
		url: string;
	};
}

const Config: ConfigType = {
	server: {
		port: process.env.PORT,
	},
	mongodb: {
		url:
			process.env.MONGODB_URL
	},
};
export default Config;

export const DATE_FORMAT = 'DD-MM-YYYY'

