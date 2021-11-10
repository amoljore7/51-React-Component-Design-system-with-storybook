import Spinner from './spinner';

export default {
  title: 'design-components/Spinner',
  component: Spinner,
};

export const Default = () => {
  const props = {
    message: 'Loading Message...',
  };

  return <Spinner {...props}></Spinner>;
};

export const Medium = () => {
  const props = {
    size: 'medium',
    message: 'Loading Message...',
  };

  return <Spinner {...props}></Spinner>;
};

export const Small = () => {
  const props = {
    size: 'small',
  };

  return <Spinner {...props}></Spinner>;
};

export const WithOverlay = () => {
  const props = {
    size: 'medium',
    message: 'Loading Message...',
    overlay: true,
  };

  return (
    <div>
      <span>Some page content on background</span>
      <Spinner {...props}></Spinner>
    </div>
  );
};
