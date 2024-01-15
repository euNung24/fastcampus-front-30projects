import React, { useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { timeList } from "../../variables";
import { useRecoilState } from "recoil";
import { Lecture, timetableState } from "../../store";
import { v4 as uuid } from "uuid";

type InputModalProps = {
  isOpen: boolean;
  handleCloseModal: () => void;
};

const checkOverlap = (
  lectureList: Lecture[],
  newLecture: Pick<Lecture, "start" | "end">,
) => {
  for (let lecture of lectureList) {
    const isOverlap =
      newLecture.start < lecture.end
        ? newLecture.end > lecture.start
        : newLecture.start < lecture.end;
    if (isOverlap) {
      return false;
    }
  }
  return true;
};
const InputModal = ({ isOpen, handleCloseModal }: InputModalProps) => {
  const [timetable, setTimetable] = useRecoilState(timetableState);

  const {
    reset,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    ({ name, day, startTime, endTime, color }) => {
      let valid = true;
      valid = checkOverlap(timetable[day], {
        start: startTime,
        end: endTime,
      });
      if (!valid) {
        alert("해당 시간의 강의가 이미 존재합니다.");
        return;
      }
      setTimetable((prev) => ({
        ...prev,
        [day]: [
          ...prev[day],
          {
            id: uuid(),
            name,
            day,
            start: startTime,
            end: endTime,
            color,
          },
        ],
      }));
      handleCloseModal();
    },
    [timetable, setTimetable, handleCloseModal],
  );

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} sx={{ width: "488px", margin: "auto" }}>
      <DialogTitle>강의 정보 입력</DialogTitle>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogContent>
          <Stack spacing={3}>
            <FormControl>
              <TextField
                label="강의명"
                variant="outlined"
                defaultValue=""
                fullWidth
                id="name"
                sx={{
                  marginTop: "20px",
                }}
                error={!!errors.name}
                helperText={!!errors.name && "강의명을 입력해주세요."}
                {...register("name", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel id="day">요일</FormLabel>
              <RadioGroup
                aria-labelledby="day"
                defaultValue="mon"
                name="day"
                row
              >
                <FormControlLabel
                  value="mon"
                  control={<Radio />}
                  label="Mon"
                  {...register("day", { required: true })}
                />
                <FormControlLabel
                  value="tue"
                  control={<Radio />}
                  label="Tue"
                  {...register("day", { required: true })}
                />
                <FormControlLabel
                  value="wen"
                  control={<Radio />}
                  label="Wen"
                  {...register("day", { required: true })}
                />
                <FormControlLabel
                  value="thu"
                  control={<Radio />}
                  label="Thu"
                  {...register("day", { required: true })}
                />
                <FormControlLabel
                  value="fri"
                  control={<Radio />}
                  label="Fri"
                  {...register("day", { required: true })}
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="startTime" sx={{ display: "none" }}>
                시작시간
              </FormLabel>
              <TextField
                label="시작시간"
                select
                defaultValue=""
                required={true}
                error={!!errors.startTime}
                helperText={!!errors.startTime && "시작시간을 선택해주세요."}
                {...register("startTime", { required: true })}
              >
                {timeList.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <FormControl>
              <FormLabel id="endTime" sx={{ display: "none" }}>
                종료시간
              </FormLabel>
              <TextField
                label="종료시간"
                select
                defaultValue=""
                error={!!errors.endTime}
                required={true}
                helperText={
                  (errors.endTime?.type === "required" &&
                    "종료시간을 선택해주세요.") ||
                  (errors.endTime?.type === "validate" &&
                    "종료시간은 시작시간보다 큰 숫자여야 합니다.")
                }
                {...register("endTime", {
                  required: true,
                  validate: (value: number) => +getValues("startTime") < +value,
                })}
              >
                {timeList.map((time) => (
                  <MenuItem key={time + 1} value={time + 1}>
                    {time + 1}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <FormControl>
              <FormLabel id="color-label" htmlFor="color">
                색상
              </FormLabel>
              <input
                id="color"
                type="color"
                defaultValue={"#000"}
                style={{
                  width: "100%",
                  height: "32px",
                }}
                {...register("color", { required: true })}
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>취소</Button>
          <Button type="submit">확인</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default InputModal;
