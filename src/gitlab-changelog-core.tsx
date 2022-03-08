import { getSelectedText, open, showToast, Toast } from "@raycast/api";

export default async () => {
  const text = await getSelectedText();

  const ref = extractGitLabReference(text);

  if (!ref) {
    showToast({
      title: "Error",
      message: "Failed to extract GitLab reference #",
      style: Toast.Style.Failure,
    });
    return;
  }

  if (ref.startsWith("#")) {
    const issue = ref.substring(1);
    await open(`https://gitlab.1password.io/dev/core/core/-/issues/${issue}`);
  } else if (ref.startsWith("!")) {
    const mr = ref.substring(1);
    await open(
      `https://gitlab.1password.io/dev/core/core/-/merge_requests/${mr}`
    );
  } else {
    showToast({
      title: "Error",
      message: `Unexpected reference: ${ref}`,
      style: Toast.Style.Failure,
    });
    return;
  }
};

function extractGitLabReference(text: String): String | null {
  const parts = text.split("**");

  if (parts && parts.length >= 2) {
    return parts[1];
  }

  return null;
}
