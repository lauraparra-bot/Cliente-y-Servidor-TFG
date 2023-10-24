import { Message, Transition } from "semantic-ui-react";
import { useTFG } from "../../../../../hooks/useTFG";
import { useEffect } from "react";

const TFGNotification = () => {
  const { abrir, setAbrir, message, setMessage, error } = useTFG();
  const handleDismiss = () => {
    setAbrir(false);
    setMessage('');
  };

  useEffect(() => {
    if (abrir) {
      const timer = setTimeout(() => {
        setAbrir(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [abrir, setAbrir]);

  return (
    <Transition visible={abrir} animation='scale' duration={500}>
    <Message
      positive={!error}
      negative={error}
      onDismiss={handleDismiss}
      hidden={!abrir}
      header="Notificación:"
      content={message}
    />
    </Transition>
  );
};

export default TFGNotification;
