import styled from "styled-components";

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 10px;
  font-size: 10px;
  span {
    color: #a52aca;
  }
`;

export const BotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  height: 30px;
  font-size: 12px;

  span {
    color: #f23030;
    margin-right: 10px;
  }
`;

export const BotMessage = styled.p`
  color: #494949;
`;

export const Message = styled.div`
  display: inline-block;
  background-color: #494949;
  border-radius: 10px;
  padding: 10px 10px;
  width: auto;
  max-width: 60%;
  font-weight: bold;
  color: white;
  white-space: pre-line;
  letter-spacing: 0.75px;
  word-break: break-all;
`;

export const MyContainer = styled(MessageContainer)`
  span {
    text-align: end;
    color: ${(props) => props.theme.lineColor};
  }
`;

export const MyMessage = styled(Message)`
  margin-left: auto;
`;
export const OtherMessage = styled(Message)`
  margin-right: auto;
`;
