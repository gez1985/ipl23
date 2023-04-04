import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Loader from "react-loader-spinner";

const PlayerSelect = ({ options, defaultPlayer, changePlayerOut }) => {
  const [loading, setLoading] = useState(false);

  const onChange = async (e) => {
    const { value } = e.target;
    try {
      setLoading(true);
      await changePlayerOut(value);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const changeTransfer = async () => {
    try {
      setLoading(true);
      await changePlayerOut(-1);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <div className="tp-player-select-container">
        <Loader type="TailSpin" color="#dd6d1f" height={30} width={30} />
      </div>
    );
  }

  if (!defaultPlayer) {
    return (
      <div className="tp-player-select-container">
        <Form>
          <Form.Group controlId="playerSelect" onChange={onChange}>
            <div className="tp-player-select-form-wrapper">
              <Form.Label className="tp-player-out-label">
                Select player for transfer:
              </Form.Label>
              <Form.Control
                as="select"
                defaultValue={defaultPlayer ? defaultPlayer.id : -1}
                style={{ width: "200px" }}
              >
                <option key="0" value={-1}>
                  No transfer
                </option>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Control>
            </div>
          </Form.Group>
        </Form>
      </div>
    );
  }

  console.log({ defaultPlayer });

  return (
    <div className="tp-player-select-container">
      <span className="tp-selected-player-caption">
        <span className="tp-selected-player-name">{defaultPlayer.name}</span>{" "}
        selected for transfer
      </span>
      <button className="tp-change-btn" onClick={changeTransfer}>
        change
      </button>
    </div>
  );
};

export default PlayerSelect;
