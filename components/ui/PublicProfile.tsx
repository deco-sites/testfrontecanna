import type {PublicProfile} from "$store/loaders/getPublicProfile.ts";

interface Props {
  publicProfile: PublicProfile;
}

function PublicProfileComponent(
  {publicProfile}: Props,
) {
  console.log({publicProfile})
  return <div></div>;
}

export default PublicProfileComponent;
