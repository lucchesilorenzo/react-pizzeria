import { useRouteError } from "react-router-dom";

import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();

  return (
    <div>
      <p>Something went wrong 😢</p>
      <p>{error.data || error.message}</p>
      <LinkButton>&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
