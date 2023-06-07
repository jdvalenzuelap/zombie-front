import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./public/locales/es/common.json";
import tl from "./public/locales/tl/common.json";

i18next.use(initReactI18next).init({
	resources: {
		es: {
			translation: es,
		},
		tl: {
			translation: tl,
		},
	},
	lng: "es",
});

export default i18next;