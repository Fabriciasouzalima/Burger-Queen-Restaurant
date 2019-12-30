import React from 'react';
import ClickableSection from '../components/ClickableSection';
import { StyleSheet, css } from 'aphrodite';
// import ConfirmationOption from '../components/ConfirmationOption';

const styles = StyleSheet.create({
  standardStyle: {
    margin: '5px',
    display: 'flex',
    flexDirection: 'column',
    width: '50vw',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: '5px',
    borderColor: '#95a5a6',
    color: '#ecf0f1'
  },
  menuStyle: {
    display: 'flex',
    margin: '15px',
    padding: '4px',
    flexWrap: 'wrap',
    flexFlow: 'row-wrap',
    justifyContent: 'space-around',
  },
  titleStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const OptionsCard = (props) => {
  const breakfastMenu = props.breakfastMenu;
  const lunchMenu = props.lunchMenu;

  return (
    <div className={css(styles.standardStyle)}>
      <section className={css(styles.menuStyle)}>
        <h4 className={css(styles.titleStyle)}>Café da Manhã</h4>
        {breakfastMenu.map((item) => <ClickableSection handleClick={(e) => {
          e.preventDefault();
          props.selectOptions(item)
        }}
          name={item.name} price={item.price}
          key={item.id} />)}
      </section>
      <section className={css(styles.menuStyle)}>
        <h4>Almoço e jantar</h4>
        {lunchMenu.map((item) => <ClickableSection handleClick={(e) => {
          e.preventDefault();
          props.selectOptions(item)
        }}
          name={item.name} price={item.price}
          key={item.id} />)}
        {/* {ConfirmationOption} */}
      </section>
    </div>
  )
};

export default OptionsCard;
