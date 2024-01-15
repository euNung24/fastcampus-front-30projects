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
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { timeList } from "../../variables";
import { useRecoilState } from "recoil";
import {
  initLectureFormState,
  Lecture,
  lectureFormState,
  timetableState,
} from "../../store";
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
  const [lectureForm, setLectureForm] = useRecoilState(lectureFormState);

  const {
    control,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      day: "mon",
      startTime: "",
      endTime: "",
      color: "#abcdef",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    ({ name, day, startTime, endTime, color }) => {
      const { editId, editDay } = lectureForm;
      let valid;
      const dayTimetable =
        editDay === day
          ? [...timetable[day]].filter((lecture) => lecture.id !== editId)
          : [...timetable[day]];
      valid = checkOverlap(dayTimetable, {
        start: startTime,
        end: endTime,
      });
      if (!valid) {
        alert("해당 시간의 강의가 이미 존재합니다.");
        return;
      }

      const newTimeTableData = editDay
        ? {
            ...timetable,
            [editDay]: [...timetable[editDay].filter((v) => v.id !== editId)],
          }
        : { ...timetable };

      setTimetable({
        ...newTimeTableData,
        [day]: [
          ...newTimeTableData[day],
          {
            id: editId ? editId : uuid(),
            name,
            start: +startTime,
            end: +endTime,
            color,
          },
        ],
      });

      handleCloseModal();
      setLectureForm(initLectureFormState);
    },
    [timetable, setTimetable, handleCloseModal, setLectureForm, lectureForm],
  );

  useEffect(() => {
    if (isOpen) {
      const { editId, editDay } = lectureForm;
      const targetLecture = timetable[editDay]?.find(
        (lecture) => lecture.id === editId,
      );

      reset({
        name: targetLecture ? targetLecture.name : "",
        day: targetLecture ? editDay : "mon",
        startTime: targetLecture ? targetLecture.start.toString() : "",
        endTime: targetLecture ? targetLecture.end.toString() : "",
        color: targetLecture ? targetLecture.color : "#abcdef",
      });
    }
  }, [isOpen, reset, lectureForm, timetable]);

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
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="강의명"
                  variant="outlined"
                  fullWidth
                  sx={{
                    marginTop: "20px",
                  }}
                  error={!!errors.name}
                  helperText={!!errors.name && "강의명을 입력해주세요."}
                />
              )}
            />
            <FormControl>
              <FormLabel id="day">요일</FormLabel>
              <Controller
                name="day"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup {...field} aria-labelledby="day" row>
                    <FormControlLabel
                      value="mon"
                      control={<Radio />}
                      label="Mon"
                    />
                    <FormControlLabel
                      value="tue"
                      control={<Radio />}
                      label="Tue"
                    />
                    <FormControlLabel
                      value="wen"
                      control={<Radio />}
                      label="Wen"
                    />
                    <FormControlLabel
                      value="thu"
                      control={<Radio />}
                      label="Thu"
                    />
                    <FormControlLabel
                      value="fri"
                      control={<Radio />}
                      label="Fri"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel id="startTime" sx={{ display: "none" }}>
                시작시간
              </FormLabel>
              <Controller
                name="startTime"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="시작시간"
                    error={!!errors.startTime}
                    helperText={
                      !!errors.startTime && "시작시간을 선택해주세요."
                    }
                  >
                    {timeList.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel id="endTime" sx={{ display: "none" }}>
                종료시간
              </FormLabel>
              <Controller
                name="endTime"
                control={control}
                rules={{
                  required: true,
                  // validate: (value: any) => +getValues("startTime") < +value,
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="종료시간"
                    error={!!errors.endTime}
                    helperText={
                      (errors.endTime?.type === "required" &&
                        "종료시간을 선택해주세요.") ||
                      (errors.endTime?.type === "validate" &&
                        "종료시간은 시작시간보다 큰 숫자여야 합니다.")
                    }
                  >
                    {timeList.map((time) => (
                      <MenuItem key={time + 1} value={time + 1}>
                        {time + 1}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel id="color-label" htmlFor="color">
                색상
              </FormLabel>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="color"
                    style={{
                      width: "100%",
                      height: "32px",
                    }}
                  />
                )}
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
