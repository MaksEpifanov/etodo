import { useState } from "react";

import { Button, Card, Modal, Text, Icon, Layout } from "@ui-kitten/components";

interface IDeleteModal {
  onDelete: () => void;
}

const DeleteModal = ({ onDelete }: IDeleteModal) => {
  const [visible, setVisible] = useState<boolean>(false);

  const onSubmit = () => {
    onDelete();
    setVisible(false);
  };

  return (
    <>
      <Button
        size="tiny"
        accessoryLeft={<Icon name="trash" />}
        style={{ width: 25, height: 25 }}
        appearance="outline"
        status="basic"
        onPress={() => setVisible(true)}
      />
      <Modal
        visible={visible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onBackdropPress={() => setVisible(false)}
      >
        <Card>
          <Text>Вы действительно хотите удалить задачу?</Text>
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <Button onPress={() => setVisible(false)}>Отмена</Button>
            <Button onPress={onSubmit}>Да</Button>
          </Layout>
        </Card>
      </Modal>
    </>
  );
};

export default DeleteModal;
