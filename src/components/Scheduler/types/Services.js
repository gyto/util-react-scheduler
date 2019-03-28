// @flow

export type Services = Object & {
    id: string,
    name: string,
    duration: number,
    price: number,
    desc: ?string,
    timeCreated?: Date,
    timeModified?: Date,
}
