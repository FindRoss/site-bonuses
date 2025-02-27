
const BonusCard = ({ bonus }) => {
  console.log('bonus, bonus, bonus: ', bonus);

  return (
    <div className="bonus-card">
      <h3>{bonus.title}</h3>
    </div>
  );
};

export default BonusCard;