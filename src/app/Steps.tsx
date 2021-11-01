import { IStackProps, Stack, Text } from '@fluentui/react';
import { ChevronRightIcon } from '@fluentui/react-icons-mdl2';
import { FontSizes, FontWeights } from '@fluentui/style-utilities';
import { FunctionComponent } from 'react';

interface StepsProps extends IStackProps {
  currentIndex: number;
  stepList: string[];
}
const Steps: FunctionComponent<StepsProps> = ({ currentIndex = 0, stepList, ...rest }) => (
  <Stack {...rest}>
    {stepList.map((step: string, index: number) => {
      const item = [
        <Text
          variant="large"
          styles={{
            root: { fontWeight: currentIndex === index ? FontWeights.regular : FontWeights.bold },
          }}
          key={step}
        >
          {step}
        </Text>,
      ];
      if (index !== stepList.length - 1)
        item.push(<ChevronRightIcon style={{ fontSize: FontSizes.small }} />);
      return item;
    })}
  </Stack>
);

export default Steps;
