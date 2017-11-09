import React, { Component, PropTypes } from 'react';

import { CopyToClipboard, Tweet } from '../share';
import { HeadingThree } from '../vanilla-modules/heading/';
import styles from './help.css';

const HELP_INSTALL_URL = 'https://docs.snapcraft.io/core/install';

export default class HelpInstallSnap extends Component {
  render() {
    const { children, headline, name, revision, stable, hasCopyButton } = this.props;
    const revOption = revision ? `--revision=${ revision }` : '';
    const command = children || `sudo snap install ${stable ? '' : '--edge '}${name} ${revOption}`;

    // TODO more at https://github.com/canonical-websites/build.snapcraft.io/issues/655
    const tweet = `Install ${name} in seconds on Linux OSes:\n`
      + `sudo snap install ${name}\n\n`
      + '(Don’t have snapd? https://docs.snapcraft.io/core/install)';

    return (
      <div className={styles.helpFlexWrapper}>
        <HeadingThree className={styles.helpFlexHeading}>{ headline }</HeadingThree>
        <div className={styles.helpText}>
          <pre className={styles.pre}>
            <code className={ styles.cli }>
              {command}
            </code>
            { hasCopyButton &&
              <div className={styles.copy}>
                <CopyToClipboard
                  copyme={ `${ command }` }
                />
              </div>
            }
          </pre>

          { revision &&
            <p className={ styles.p }>
              The installed snap will not be auto-updated.
            </p>
          }
          <p className={ styles.snapdLink }>
            (
            <a
              className={ styles.external }
              href={ HELP_INSTALL_URL }
              rel="noreferrer noopener"
              target="_blank"
            >
              Don’t have snapd installed?
            </a>
            )
          </p>
          <div>
            { stable &&
              <Tweet
                text={ tweet }
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

HelpInstallSnap.propTypes = {
  headline: PropTypes.string.isRequired,
  // name is only required if there is no children specified
  name: (props, propName, componentName) => {
    if (typeof props.children === 'undefined' && typeof props[propName] !== 'string') {
      return new Error(`The prop '${propName}' in ${componentName} should be a string if no children are specified.`);
    }
  },
  revision: PropTypes.number,
  stable: PropTypes.bool,
  children: PropTypes.node,
  hasCopyButton: PropTypes.bool
};
