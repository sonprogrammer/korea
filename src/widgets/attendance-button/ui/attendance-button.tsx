"use client";

import { Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

interface AttendanceButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function AttendanceButton({
  onClick,
  loading,
  disabled,
}: AttendanceButtonProps) {
  return (
    <div className="z-40 px-4 py-4 ">
      <div className="mx-auto w-full max-w-107">
        <Button
          type="default"
          size="large"
          block
          icon={<CheckCircleOutlined />}
          loading={loading}
          disabled={disabled}
          onClick={onClick}
          className="h-14! rounded-full! text-base! font-black! shadow-lg! bg-red-500! text-white!"
        >
          참여 인증
        </Button>
      </div>
    </div>
  );
}
