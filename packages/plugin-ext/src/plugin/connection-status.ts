/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import { injectable, inject } from 'inversify';
import { connectionStatus } from '@theia/plugin';
import { Emitter } from '@theia/core/lib/common/event';
import { ConnectionStatusService, ConnectionStatus } from '@theia/core/lib/browser/connection-status-service';

@injectable()
export class ConnectionStatusImpl {
    sayHello() { }

    private readonly _connectionStatusChange = new Emitter<connectionStatus.ConnectionStatusChangeEvent>();

    get onConnectionStatusChanged() {
        return this._connectionStatusChange.event;
    }

    @inject(ConnectionStatusService)
    protected readonly connectionStatusService: ConnectionStatusService;

    constructor() {
        this.connectionStatusService.onStatusChange(() => this._onConnectionStatusChanged());
    }

    private _onConnectionStatusChanged(): void {
        const event: connectionStatus.ConnectionStatusChangeEvent = {
            httpStatusCode: 200,
            connected: this.connectionStatusService.currentStatus === ConnectionStatus.ONLINE
        };

        this._connectionStatusChange.fire(event);
    }

}
