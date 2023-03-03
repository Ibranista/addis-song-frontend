import styled from "@emotion/styled";

function GoogleStyles() {
  const GoogleButton = styled.div`
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: #e6e6e6;
    }
    max-width: 500px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    button {
      background-color: #fff;
      color: #000;
      border-radius: 5px;
      border: none;
      display: flex;
      align-items: center;
      gap: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  `;
  return GoogleButton;
}

export default GoogleStyles;
