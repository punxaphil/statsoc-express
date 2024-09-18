import { Button, Flex, FormLabel, Heading, Input, Toast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Form, useActionData, useLoaderData } from 'react-router-dom';
import { colors } from '../services/const';

function getHeading(text: string, mt = 10) {
  return (
    <Heading size="md" m="3" mt={mt}>
      {text}
    </Heading>
  );
}

export default function Players() {
  const { players, selectedPlayer } = useLoaderData() as { players: { name: string }[]; selectedPlayer: string };
  let actionData = useActionData();
  if (!actionData) {
    actionData = { error: '', success: '' };
  }
  const { error, success } = actionData as { error: string; success: string };
  const [deleteMode, setDeleteMode] = useState<Boolean>(false);
  return (
    <>
      <Flex direction="column" align="center">
        {getHeading('Välj spelare', 3)}
        <>
          <Flex wrap="wrap">
            {players.map((player, index) => (
              <Form method={deleteMode ? 'delete' : 'get'} key={player.name}
                    action={deleteMode ? `/players/${player.name}` : `/stats/${player.name}`}>
                <Button
                  variant={player.name === selectedPlayer ? 'outline' : 'solid'}
                  key={player.name}
                  m="2"
                  colorScheme={colors[index % colors.length]}
                  type="submit"
                  rightIcon={deleteMode ? <FaRegTrashCan /> : undefined}>
                  {player.name}
                </Button>
              </Form>

            ))}
          </Flex>
          {getHeading('Skapa ny spelare')}
          <Form method="post">
            <FormLabel>Namn</FormLabel>
            <Input name="name" type="text" placeholder="spelarens namn" size="lg"
            />
            <Button variant="outline" type="submit" width="full" mt={4}>
              Spara
            </Button>
          </Form>

          {getHeading('Ta bort spelare')}
          <Button colorScheme="red" onClick={() => setDeleteMode(!deleteMode)}>
            {deleteMode ? 'Klar' : 'Välj spelare...'}
          </Button>
          {error &&
            <Toast description="Failed to post" title="Error save/delete" status="error" duration={9000}
                   isClosable={true} />}
        </>
      </Flex>
    </>
  );
}
