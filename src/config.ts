/**Config.ts */
interface ConfigType {
	server: {
		port: number | string;
	};
	mongodb: {
		url: string;
	};
	jwtsecret: string
}

const Config: ConfigType = {
	server: {
		port: process.env.PORT
	},
	mongodb: {
		url:process.env.MONGOURL
	},
	jwtsecret: process.env.JWT_SECRET
};
export default Config;

export const DATE_FORMAT = 'DD-MM-YYYY'

