import React, { useEffect, useRef, useState } from "react";
import { Stack } from "@strapi/design-system/Stack";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import Editor from "../Editor";
import { useIntl } from "react-intl";

const BlockNote: React.FC<{
  name: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  value: string;
  intlLabel: { id: string; defaultMessage: string };
  disabled: boolean;
  error: string;
  description: { id: string; defaultMessage: string };
  required: boolean;
}> = ({
  name,
  onChange,
  value,
  intlLabel,
  disabled,
  error,
  description,
  required,
}) => {
  const { formatMessage } = useIntl();

  const [initialized, setInitialized] = useState(false);
  const timerRef = useRef<any>(null);

  // dirty hack to wait until value is set by strapi
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setInitialized(true);
    }, 100);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <Stack size={1}>
        <Box>
          <Typography variant="pi" fontWeight="bold">
            {formatMessage(intlLabel)}
          </Typography>
          {required && (
            <Typography variant="pi" fontWeight="bold" textColor="danger600">
              *
            </Typography>
          )}
        </Box>
        <Box borderColor="primary200" borderRadius="4px">
          {initialized && (
            <Editor
              disabled={disabled}
              name={name}
              onChange={onChange}
              value={value}
            />
          )}
        </Box>
        {error && (
          <Typography variant="pi" textColor="danger600">
            {formatMessage({ id: error, defaultMessage: error })}
          </Typography>
        )}
        {description && (
          <Typography variant="pi">{formatMessage(description)}</Typography>
        )}
      </Stack>
    </>
  );
};

export default BlockNote;
