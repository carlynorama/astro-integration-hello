import { defineIntegration } from "astro-integration-kit";
import kleur from "kleur";

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const logServerMessage = (message:String) => {
  const date = dateTimeFormat.format(new Date());
  console.log(`${kleur.gray(date)} ${kleur
    .bold()
    .cyan("[astro-hello-integration]")} ${message}
    `);
};

export const integration = defineIntegration({
	name: "astro-integration-hello",
	setup() {
		return {
			hooks: {
				"astro:config:setup": () => {
					logServerMessage("Integration Happened");
				}
				
			},
		};
	},
});
