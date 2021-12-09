import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

const NumberPagination = (props) => {
  const {
    total,
    currentPage,
  } = props;

  return (
    <View style={styles.paginationStyle}>
      <Text style={styles.paginationText}>
        <Text >{currentPage}/{total}</Text>
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  paginationStyle: {
    position: 'absolute',
    backgroundColor: '#444857',
    height: 22,
    borderRadius: 11,
    top: 10,
    right: 10,
    paddingHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },

  paginationText: {
    height: 22,
    lineHeight: 22,
    color: 'white',
    fontSize: 12
  },
});

NumberPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default NumberPagination;

