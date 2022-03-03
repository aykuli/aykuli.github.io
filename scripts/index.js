const onToggleMenu = (state) => {
  console.log("0000");
  return state === "opened" ? "closed" : "opened";
};

module.exports = {
  onToggleMenu,
};
