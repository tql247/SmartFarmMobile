import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

import { Transitioning, Transition } from 'react-native-reanimated';

const MaxShowDotNum = 5;

const Pagination = (props) => {
  const {
    total,
    currentPage,
  } = props;

  const ref = useRef()

  const getStyle = (index, total, i) => {
    let commonViewStyle = {
      opacity: 1,
      backgroundColor: index === i ? '#08072B' : '#D5D5D8',
      width: 5,
      height: 5,
      borderRadius: 2.5,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    }

    let littleViewStyle = {
      opacity: 1,
      backgroundColor: index === i ? '#08072B' : '#D5D5D8',
      width: 5,
      height: 5,
      borderRadius: 2.5,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
      transform: [{ scale: 0.6 }]
    }

    let hiddenStyle = {
      opacity: 0,
      width: 0,
      height: 5,
      borderRadius: 2.5,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 3,
      marginBottom: 3,
      transform: [{ scale: 0 }]
    }

    if (index < 2) {
      if (i === (MaxShowDotNum - 1)) {
        return littleViewStyle
      }
      if (i < MaxShowDotNum) {
        return commonViewStyle
      }
    } else if (index >= total - 2) {
      if (i === (total - MaxShowDotNum)) {
        return littleViewStyle
      }
      if (i >= (total - MaxShowDotNum)) {
        return commonViewStyle
      }
    } else if (index <= i + 2 && index >= i - 2) {
      if ((index === i + 2) || (index === i - 2)) {
        return littleViewStyle
      }
      return commonViewStyle
    }

    return hiddenStyle
  }

  const renderDots = () => {
    if (total <= 1) return <View />

    if (!!ref.current) {
      ref.current.animateNextTransition()
    }
    const Dots = [];
    for (let i = 0; i < total; i += 1) {
      let style = getStyle(currentPage - 1, total, i)

      Dots.push((
        <View
          key={`pagination-dot-${i}`}
          style={style}
        />
      ));
    }
    return Dots;
  };

  return (
    <View style={styles.container}>
      <Transitioning.View
        ref={ref}
        transition={<Transition.Change interpolation="easeInOut" />}
        style={styles.paginationContainer}
      >
        {renderDots()}
      </Transitioning.View>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    position: 'absolute',
    bottom: -19,
    width: '100%',
  },
});

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  theme: PropTypes.oneOf(['dark', 'light']),
};

Pagination.defaultProps = {
  theme: 'dark',
};

export default Pagination;

