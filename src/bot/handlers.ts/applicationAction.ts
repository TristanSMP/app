import { ApplicationStatus } from "@prisma/client";
import type { ButtonHandler, ButtonInteraction } from "disploy";
import { prisma } from "../../server/db/client";
import { updateRoleMeta } from "../../server/lib/discord";

async function handle(
  interaction: ButtonInteraction,
  action: "accept" | "deny",
  applicationId: string
) {
  interaction.deferReply();

  const application = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
    include: {
      user: {
        include: {
          accounts: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  if (!application) {
    return void interaction.editReply({
      content: "Application not found.",
    });
  }

  try {
    await prisma.application.update({
      where: {
        id: application.id,
      },
      data: {
        status:
          action === "accept"
            ? ApplicationStatus.Approved
            : ApplicationStatus.Denied,
        reviewer: interaction.user.id,
      },
    });

    await updateRoleMeta({
      ...application.user,
      application: application,
    });

    return void interaction.editReply({
      content: `Application ${action === "accept" ? "accepted" : "denied"}.`,
    });
  } catch (error) {
    console.error(error);
    return void interaction.editReply({
      content: "An error occurred.",
    });
  }
}

const AcceptApplication: ButtonHandler = {
  customId: "accept-application-:id",

  async run(interaction) {
    const applicationId = interaction.params.getParam("id");
    return await handle(interaction, "accept", applicationId);
  },
};

const DenyApplication: ButtonHandler = {
  customId: "deny-application-:id",

  async run(interaction) {
    const applicationId = interaction.params.getParam("id");
    return await handle(interaction, "deny", applicationId);
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default [AcceptApplication, DenyApplication];