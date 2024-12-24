import { convertFarsiToEnglishNumber } from ".";

export const convertFarsiNumeralsInDto = (dto: any): any => {
  if (typeof dto === "string") {
    return convertFarsiToEnglishNumber(dto);
  }

  if (Array.isArray(dto)) {
    return dto.map(convertFarsiNumeralsInDto);
  }

  if (typeof dto === "object" && dto !== null) {
    const newDto: any = {};
    for (const key in dto) {
      if (dto.hasOwnProperty(key)) {
        newDto[key] = convertFarsiNumeralsInDto(dto[key]);
      }
    }
    return newDto;
  }

  return dto;
};
