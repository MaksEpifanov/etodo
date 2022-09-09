import { Button, Icon } from "@ui-kitten/components";
import { Container, ErrorText } from "./SyncIndicator.styles";

interface ISyncIndicator {
  isLoad: boolean;
  isError: boolean;
  restart: () => void;
}

const SyncIndicator = ({ isLoad, isError, restart }: ISyncIndicator) => {
  if (isLoad) return <ErrorText>Синхронизация</ErrorText>;
  if (isError)
    return (
      <Container>
        <Button
          size="tiny"
          onPress={() => restart()}
          accessoryLeft={<Icon name="sync" />}
        />
        <ErrorText>Ошибка</ErrorText>
      </Container>
    );
  return null;
};

export default SyncIndicator;
