import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { Fragment, useRef, useState } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';

const maxIndex = () => {
  const tMaxIndex = [
    ...Array.from(document.querySelectorAll('#myModal')),
  ].reduce((r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0), 0);
  return tMaxIndex >= 1000 ? tMaxIndex : 1000;
};

interface NBDialogProps {
  visible: boolean;
  title: string;
  onOk: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

const NBDialog = (props: NBDialogProps) => {
  const { visible, title, onOk, onCancel, children, style, ...otherProps } =
    props;
  const [zIndex, setIndex] = useState(maxIndex() + 1);

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null);

  const [disabled, setDisabled] = useState(true);

  const handleOnClick = () => {
    setIndex(maxIndex() + 1);
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <Fragment>
      {visible && (
        <Draggable
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
          positionOffset={{ x: '-50%', y: '-50%' }}
          disabled={disabled}
        >
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              width: '520px',
              border: '1px solid #eeeeee',
              zIndex: zIndex,
              ...style,
            }}
            {...otherProps}
            onClick={handleOnClick}
            ref={draggleRef}
            id="myModal"
          >
            <div
              style={{
                borderRadius: '2px',
                boxShadow:
                  '0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d',
                backgroundColor: '#fff',
              }}
            >
              <Button
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  fontSize: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '54px',
                  height: '54px',
                  backgroundColor: '#fff',
                }}
                type="text"
                icon={<CloseOutlined />}
                onClick={onCancel}
              />

              <div
                style={{
                  fontSize: '14px',
                  padding: '16px 24px',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '2px 2px 0 0',
                  cursor: 'move',
                }}
                onMouseOver={() => {
                  if (disabled) {
                    setDisabled(false);
                  }
                }}
                onMouseOut={() => {
                  setDisabled(true);
                }}
                onFocus={() => {}}
                onBlur={() => {}}
                onMouseDownCapture={handleOnClick}
              >
                {title}
              </div>
              <div
                style={{
                  padding: '24px',
                  fontSize: '14px',
                  lineHeight: '1.5715',
                  wordWrap: 'break-word',
                }}
              >
                {children}
              </div>
              <div
                style={{
                  padding: '10px 16px',
                  borderTop: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '0 0 2px 2px',
                  textAlign: 'right',
                }}
              >
                <Button onClick={onCancel}>Cancel</Button>
                <Button
                  onClick={onOk}
                  style={{ marginLeft: '8px' }}
                  type="primary"
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </Fragment>
  );
};

export default NBDialog;
