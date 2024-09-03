import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Understand Component Dependencies',
    Svg: require('@site/static/img/undraw_dependency_analysis.svg').default, // Replace with a relevant SVG
    description: (
      <>
        Gain insights into how components are interrelated in your Figma files. Identify which components are most critical to your design system.
      </>
    ),
  },
  {
    title: 'Optimize Development Workflow',
    Svg: require('@site/static/img/undraw_workflow_optimization.svg').default, // Replace with a relevant SVG
    description: (
      <>
        Use the analysis to determine the optimal order of component development. Ensure a smooth and efficient workflow by addressing the most foundational elements first.
      </>
    ),
  },
  {
    title: 'Generate Actionable Reports',
    Svg: require('@site/static/img/undraw_report_generation.svg').default, // Replace with a relevant SVG
    description: (
      <>
        Create detailed reports that highlight the dependencies and usage of components within your design. Use these reports to improve collaboration and decision-making.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
