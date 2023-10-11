import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  const errorText = error?.statusText || error?.message || null;

  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
      subTitle={errorText}
      extra={
        <Link to="/">
          <Button type="primary" key="console">
            Go Console
          </Button>
        </Link>
      }
    />
  );
};
