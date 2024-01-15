import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type ConfirmModalProps = {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleDeleteLecture: () => void;
};
const ConfirmModal = ({
  isOpen,
  handleCloseModal,
  handleDeleteLecture,
}: ConfirmModalProps) => {
  return (
    <Dialog open={isOpen} sx={{ width: "488px", margin: "auto" }}>
      <DialogTitle align="center">강의 정보 삭제</DialogTitle>
      <DialogContent>해당 강의를 삭제하시겠습니까?</DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>취소</Button>
        <Button onClick={handleDeleteLecture}>확인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
