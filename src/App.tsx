import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Code from "./components/Code";
import ReactNativeImage from "./images/react-native.png";
import How1Image from "./images/how1.png";
import How2Image from "./images/how2.png";
import How3Image from "./images/how3.png";
import HorizontalRule from "./components/HorizontalRule";
import colors from "./colors";

const jsxCode = `const Component = ({ prop }) => <div>{prop}</div>;

const component =
  <div className="hello">
    <Component prop={prop} />
    <h1>First child</h1>
  </div>
;`;

const transpiledCode = `const Component = ({ prop }) => React.createElement("div", null, prop);

const component = React.createElement(
  "div",
  {
    className: "hello",
  },
  React.createElement(Component, {
    prop: prop,
  }),
  React.createElement("h1", null, "First child")
);`;

const rnCode = `import React from 'react';
import { Text, View } from 'react-native';

const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
    </View>
  )
}
export default HelloWorldApp;`;

const CoverImage = styled.img`
  width: 320px;
  margin-bottom: 40px;
`;

interface ISlide {
  subSteps?: number;
  content: (subStep: number) => ReactNode;
}

const slides: ISlide[] = [
  {
    content: () => (
      <>
        <CoverImage src={ReactNativeImage} />
        <h1>
          React Native <br />
          <em>Workshop</em>
        </h1>
      </>
    ),
  },
  {
    content: () => <h2>¿Qué es React Native?</h2>,
  },
  {
    content: () => (
      <h3>
        Framework para desarrollar aplicaciones para iOS y Android con React
        usando componentes <em>nativos</em>.
      </h3>
    ),
  },
  {
    content: () => (
      <h3>
        ¿Pero no es React un framework para crear aplicaciones <em>Web</em>?
      </h3>
    ),
  },
  {
    subSteps: 2,
    content: (subStep) => (
      <>
        <Code code={jsxCode} />
        <Fade visible={subStep > 0}>
          <Code code={transpiledCode} />
        </Fade>
      </>
    ),
  },
  {
    content: () => <Code code={rnCode} />,
  },
  {
    subSteps: 3,
    content: (subStep) => (
      <>
        <h3>¿Cómo funciona React Native?</h3>
        <HowRow>
          <div>
            <img src={How1Image} />
          </div>
          <Fade visible={subStep > 0}>
            <img src={How2Image} />
          </Fade>
          <Fade visible={subStep > 1}>
            <img src={How3Image} />
          </Fade>
        </HowRow>
      </>
    ),
  },
  {
    content: () => <h2>¿Por qué usar React Native?</h2>,
  },
  {
    content: () => (
      <h3>
        Podemos programar para las dos plataformas usando el mismo{" "}
        <em>lenguage</em>, el mismo <em>framework</em> el mismo sistema de{" "}
        <em>layout</em>.
      </h3>
    ),
  },
  {
    content: () => (
      <h3>
        Flujo de trabajo más rápido. Actualizaciones en <em>caliente</em> sin
        necesidad de re-compilar la aplicación.
      </h3>
    ),
  },
  {
    content: () => (
      <h3>
        Reutilizar el conocimiento y la experiencia de desarrolladores
        acostumbrados a usar <em>JS + React</em>.
      </h3>
    ),
  },
  {
    content: () => (
      <>
        <h3>¡A programar!</h3>
      </>
    ),
  },
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [subStep, setSubStep] = useState(0);

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.keyCode === 37) {
        if (subStep === 0) {
          if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
          }
        } else {
          setSubStep(subStep - 1);
        }
      }
      if (e.keyCode === 39) {
        const subStepCount = slides[currentSlide].subSteps || 1;
        if (subStep < subStepCount - 1) {
          setSubStep(subStep + 1);
        } else {
          if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
          }
        }
      }
    };

    window.addEventListener("keydown", onKeyPress);
    return () => window.removeEventListener("keydown", onKeyPress);
  }, [currentSlide, subStep]);

  useEffect(() => {
    setSubStep(0);
  }, [currentSlide]);

  return (
    <Wrap>
      <Container style={{ transform: `translate(-${currentSlide * 100}%,0)` }}>
        {slides.map((slide, i) => (
          <Slide key={i} active={currentSlide === i}>
            <HorizontalRule />
            <SlideContent>{slide.content(subStep)}</SlideContent>
          </Slide>
        ))}
      </Container>
    </Wrap>
  );
}

export default App;

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.75s ease;
  display: flex;
`;

const Slide = styled.div<{ active?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: opacity 0.75s ease;
  opacity: ${(props) => (props.active ? 1 : 0)};
`;

const SlideContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
  line-height: 1.2;

  em {
    color: ${colors.green};
  }

  h1 {
    font-size: 60px;
    text-align: center;
    font-weight: bold;
    em {
      font-size: 48px;
    }
  }

  h2 {
    font-size: 40px;
    text-align: center;
    font-weight: bold;
    max-width: 70%;
  }

  h3 {
    font-size: 36px;
    text-align: center;
    font-weight: bold;
    max-width: 70%;
    margin-bottom: 40px;
    line-height: 1.4;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Fade = styled.div<{ visible?: boolean }>`
  transition: opacity 0.75s ease;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const HowRow = styled(Row)`
  div {
    width: 30%;
    margin-right: 20px;
  }
  img {
    width: 100%;
  }
`;
