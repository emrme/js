import { Flex, Radio, Stack, type StackProps, Tooltip } from "@chakra-ui/react";
import { InfoIcon } from "lucide-react";
import type { MouseEventHandler } from "react";
import { Card, Heading, Text } from "tw-components";

interface SelectOptionProps extends StackProps {
  name: string;
  description?: string;
  isActive?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
  disabledText?: string;
  infoText?: string | JSX.Element;
}

export const SelectOption: React.FC<SelectOptionProps> = ({
  name,
  description,
  isActive = true,
  onClick,
  disabled,
  disabledText,
  infoText,
  ...stackProps
}) => {
  return (
    <Tooltip
      label={
        disabled && (
          <Card bgColor="backgroundHighlight">
            <Text>{disabledText}</Text>
          </Card>
        )
      }
      bg="transparent"
      boxShadow="none"
      p={0}
      shouldWrapChildren
    >
      <Stack
        as={Card}
        padding={5}
        width={{ base: "inherit", md: "350px" }}
        borderRadius="md"
        borderColor={isActive ? "primary.500" : undefined}
        onClick={onClick}
        cursor={disabled ? "not-allowed" : "pointer"}
        pointerEvents={disabled ? "none" : undefined}
        bgColor={disabled ? "backgroundHighlight" : undefined}
        {...stackProps}
      >
        <Flex flexDirection="row" justifyContent="space-between">
          <div className="flex flex-row items-start gap-0">
            <Radio
              cursor="pointer"
              size="lg"
              colorScheme="primary"
              mt={0.5}
              mr={2.5}
              isChecked={isActive}
              isDisabled={disabled}
            />
            <Stack ml={4} flexDirection="column" alignSelf="start">
              <Heading
                size="subtitle.sm"
                fontWeight="700"
                mb={0}
                color={disabled ? "gray.600" : "inherit"}
              >
                {name}
              </Heading>
              {description && (
                <Text size="body.sm" mt="4px">
                  {description}
                </Text>
              )}
            </Stack>
          </div>
          {infoText && (
            <div className="flex flex-row">
              <Tooltip
                bg="transparent"
                boxShadow="none"
                p={0}
                shouldWrapChildren
                label={
                  <Card bgColor="backgroundHighlight">
                    <Text>{infoText}</Text>
                  </Card>
                }
              >
                <Flex alignItems="center">
                  <InfoIcon className="size-4" />
                </Flex>
              </Tooltip>
            </div>
          )}
        </Flex>
      </Stack>
    </Tooltip>
  );
};
