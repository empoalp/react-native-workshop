import React, { FC } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from 'prism-react-renderer/themes/nightOwl';
import styled from "@emotion/styled";

export interface ICodeProps {
  code: string;
}

const Code: FC<ICodeProps> = ({ code }) => {
  return (
    <Highlight {...defaultProps} code={code} language="jsx" theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};

export default Code;

const Pre = styled.pre`
  padding: 20px;
  border-radius: 5px;
  font-family: "Roboto Mono", monospace;
  margin-bottom: 40px;
`;
