const Header = () => {
  return (
    <div className="row" style={{ background: "#f9fafb" }}>
      <div style={{ flex: 0.2, width: "20%" }}>
        <b>Title</b>
      </div>
      <div style={{ flex: 0.4, width: "30%" }}>
        <b>Description</b>
      </div>
      <div style={{ flex: 0.1, width: "10%" }}>
        <b>Due date</b>
      </div>
      <div style={{ flex: 0.1, width: "10%" }}>
        <b>Status</b>
      </div>
      <div className="item" style={{ flex: 0.15, width: "15%" }}>
        <b>Action</b>
      </div>
    </div>
  );
};
export default Header;
