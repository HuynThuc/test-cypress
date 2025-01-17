import { IGetWordDefinitionResponseBody, IGroupIDefinition } from '../types';

export function groupDefinitions(
  wordInfo: IGetWordDefinitionResponseBody,
): IGroupIDefinition {
  const groupedDefinitions: Record<
    string,
    {
      pos: string;
      pronunciationUK: string;
      pronunciationUS: string;
      pronunciationKK: string;
      posFullName: string;
      englishDefinitions: string[];
    }
  > = {};

  wordInfo.data?.definitions.forEach((definition) => {
    const {
      pos,
      pronunciationUK,
      pronunciationUS,
      pronunciationKK,
      posFullName,
      englishDefinition,
    } = definition;
    if (!groupedDefinitions[posFullName]) {
      groupedDefinitions[posFullName] = {
        pos,
        pronunciationKK,
        pronunciationUK,
        pronunciationUS,
        posFullName,
        englishDefinitions: [],
      };
    }

    if (
      !groupedDefinitions[posFullName].englishDefinitions.includes(
        englishDefinition,
      )
    ) {
      groupedDefinitions[posFullName].englishDefinitions.push(
        englishDefinition,
      );
    }
  });

  return {
    ...wordInfo,
    cefrLevel: wordInfo.data?.cefrLevel,
    definitions: Object.values(groupedDefinitions).map((group) => ({
      pos: group.pos,
      pronunciationKK: group.pronunciationKK,
      pronunciationUK: group.pronunciationUK,
      pronunciationUS: group.pronunciationUS,
      posFullName: group.posFullName,
      englishDefinition: group.englishDefinitions,
    })),
  };
}
