import { basename } from 'lib/config';

export const withTo = (WrappedComponent) => {
  return (props) => {
    const { baseUrl, children, className, href, target, withCurrentQueryString } = props;

    const url = `${baseUrl || basename}${href}`;

    return <WrappedComponent {...props} href={url} />;
  };
};
