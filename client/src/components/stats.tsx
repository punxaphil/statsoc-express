import { Box, Button, Center, Flex, Heading, Icon, Text, ThemeTypings } from '@chakra-ui/react';
import React from 'react';
import { FaUsersGear } from 'react-icons/fa6';
import { Form, Link, useLoaderData } from 'react-router-dom';
import { categories } from '../services/const';
import { Category, Statistic } from '../services/types';

function StatsButton({ children, selectedName, number, category, colorScheme, isDisabled }: {
  children: React.ReactNode,
  selectedName: string,
  number: number,
  category: Category,
  colorScheme?: ThemeTypings['colorSchemes'],
  text?: string,
  isDisabled?: boolean
}) {
  return (<Form action={`/stats/${selectedName}`} method="POST">
    <input type="hidden" name="count" value={number} />
    <input type="hidden" name="category" value={category.name} />
    <Button
      flex="1"
      colorScheme={colorScheme}
      type="submit"
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  </Form>);
}

export default function Stats() {
  const { stats, selectedName } = useLoaderData() as { stats: Statistic[]; selectedName: string };

  let prevCategory = '';

  return (
    <>
      <Center>
        <Heading>
          <Link to={`/players/${selectedName}`}>
            <Center>
              StatSoc - {selectedName}
              <Icon as={FaUsersGear} boxSize="5" m="3" />
            </Center>
          </Link>
        </Heading>
      </Center>

      <Flex justify="space-evenly" m="3" direction={'column'} gap="1">
        {categories.map((category) => {
          const statistic = stats.find((stat) => stat.description === category.name);
          const number = statistic ? statistic.count : 0;
          const element = (
            <Box key={category.name}>
              {category.type !== prevCategory ? (
                <Heading size="sm" mt="3" mb="1">
                  {category.type}
                </Heading>
              ) : (
                ''
              )}
              <Flex align="center" gap="1">
                <Text flex="1">{number}</Text>
                <StatsButton
                  selectedName={selectedName}
                  number={number - 1}
                  category={category}
                  colorScheme="red"
                  isDisabled={number === 0}>-</StatsButton>
                <StatsButton
                  selectedName={selectedName}
                  number={number + 1}
                  category={category}
                  colorScheme="green"
                >+</StatsButton>
                <Text flex="12">{category.name}</Text>
              </Flex>
            </Box>
          );
          prevCategory = category.type;
          return element;
        })}
      </Flex>
    </>
  );
}
