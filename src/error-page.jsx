import { Link, useRouteError } from "react-router-dom";
import { Button, Image } from "antd";
import { BASE_URL } from "./config";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Image
        width={200}
        src="./assets/images/404.png"
        alt="not found"
        preview={false}
      />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button type="primary">
        <Link to={`${BASE_URL}/home`}>Back to Home</Link>
      </Button>
    </div>
  );
}
