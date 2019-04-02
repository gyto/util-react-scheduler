// @flow

import type {Services} from './Services';

export type Events = Object & {
    name: string,
    startIn: Date,
    endsIn: Date,
    serviceIds: Services[],
    status: ?string,
    total: number,
    timeCreated?: Date,
    timeModified?: Date,
}
