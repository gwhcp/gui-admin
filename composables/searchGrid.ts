import { ComputedRef } from "vue";

interface UseSearchGridInterface {
    cellInvoiceType: (params: string) => object;
    cellParams: ComputedRef<Record<string, unknown>>;
    cellOrderStatus: object;
    cellSelected: ComputedRef<boolean>;
    cellQueueStatus: (params: string) => object;
    cellQueueType: (params: string) => object;
    cellStatus: (params: string) => object;
    cellTransactionType: (params: string) => object;
    filterDate: () => {
        comparator: (filterLocalDateAtMidnight: never, cellValue: never) => (number | unknown);
        buttons: string[];
    };
    filterDnsResults: (params: string[]) => string[];
    filterString: () => {
        buttons: string[];
    };
    formatActiveStatus: (params: string) => string;
    formatDate: (params: string) => string;
    formatInTestModeStatus: (params: string) => string;
    formatInvoiceAmount: (params: string) => string;
    formatInvoiceType: (params: string) => string;
    formatOrderStatus: (params: string) => string;
    formatQueueStatus: (params: string) => string;
    formatTransactionType: (params: string) => string;
    selectionClear: () => void;
    selectionUpdate: (selectedRow: string[]) => void;
}

const globalSearchGrid = reactive({
    cellParams: {},
    cellSelected: false
});

export const useSearchGrid = (): UseSearchGridInterface => {
    const { convertDateTime } = useUtils();

    const cellInvoiceType = (params: any) => {
        if (params.value == 'charge') {
            return { color: '#198754' };
        } else if (params.value == 'debit') {
            return { color: '#DC3545' };
        } else if (params.value == 'refund') {
            return { color: '#0D6EFD' };
        } else {
            return { color: '#FFC107' };
        }
    };

    const cellOrderStatus = (params: any) => {
        switch (params.value.toLowerCase()) {
            case 'call':
                return { color: '#0DCAF0' };
            case 'cancelled':
                return { color: '#DDDDDD' };
            case 'fraud':
                return { color: '#DC3545' };
            case 'unverified':
                return { color: '#FFC107' };
            case 'valid':
                return { color: '#198754' };
            default:
                return { color: '#000000' };
        }
    };

    const cellParams = computed(() => {
        return globalSearchGrid.cellParams;
    });

    const cellSelected = computed(() => {
        return globalSearchGrid.cellSelected;
    });

    const cellQueueStatus = (params: any) => {
        if (!params.data['in_queue']) {
            return (params.data['is_active'] ? { color: '#198754' } : { color: '#DC3545' });
        } else {
            return { color: '#FFA500' };
        }
    };

    const cellQueueType = (params: any) => {
        switch (params.value.toLowerCase()) {
            case 'active':
                return { color: '#198754' };
            case 'failed':
                return { color: '#DC3545' };
            case 'pending':
                return { color: '#0dcaf0' };
            case 'pending_failed':
                return { color: '#ffc107' };
            case 'working':
                return { color: '#6c757d' };
            default:
                return { color: '#000000' };
        }
    };

    const cellStatus = (params: any) => {
        return (params.value === 'Active' ? { color: '#198754' } : { color: '#DC3545' });
    };

    const cellTransactionType = (params: any) => {
        if (params.value == 'auth_capture') {
            return { color: '#198754' };
        } else if (params.value == 'refund') {
            return { color: '#0D6EFD' };
        } else {
            return { color: '#FFC107' };
        }
    };

    const filterDate = () => {
        return {
            comparator: function (filterLocalDateAtMidnight: any, cellValue: any) {
                const dateAsString = cellValue.substring(0, 10);

                if (dateAsString == null) return -1;

                const dateParts = dateAsString.split('-');

                const cellDate = new Date(
                    Number(dateParts[0]),
                    Number(dateParts[1]) - 1,
                    Number(dateParts[2])
                );

                if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                    return 0;
                }

                if (cellDate < filterLocalDateAtMidnight) {
                    return -1;
                }

                if (cellDate > filterLocalDateAtMidnight) {
                    return 1;
                }
            },
            buttons: [
                'apply',
                'reset'
            ]
        };
    };

    const filterString = () => {
        return {
            buttons: [
                'apply',
                'reset'
            ]
        }
    };

    const formatActiveStatus = (params: any) => {
        return (params.data['is_active'] ? 'Active' : 'Suspended');
    };

    const formatDate = (params: any) => {
        return convertDateTime(params.value);
    };

    const filterDnsResults = (params: string[]) => {
        return params.filter(function (element: any) {
            return element['is_custom'] === true;
        });
    };

    const formatInTestModeStatus = (params: any) => {
        return (params.data['in_test_mode'] ? 'Active' : 'Suspended');
    };

    const formatInvoiceAmount = (params: any) => {
        if (params.data['invoice_type'] === 'debit') {
            return `-$${params.data['amount']}`;
        } else {
            return `$${params.data['amount']}`;
        }
    };

    const formatInvoiceType = (params: any) => {
        if (params.value === 'charge') {
            return 'Charge';
        } else if (params.value == 'debit') {
            return 'Debit';
        } else if (params.value == 'refund') {
            return 'Refund';
        } else {
            return 'Void';
        }
    };

    const formatOrderStatus = (params: any) => {
        switch (params.value.toLowerCase()) {
            case 'call':
                return 'Call & Void';
            case 'cancelled':
                return 'Cancelled';
            case 'fraud':
                return 'Fraud';
            case 'new':
                return 'New';
            case 'unverified':
                return 'Unverified';
            case 'valid':
                return 'Valid';
            default:
                return 'Unknown';
        }
    };

    const formatQueueStatus = (params: any) => {
        if (!params.data['in_queue']) {
            return (params.data['is_active'] ? 'Enabled' : 'Disabled');
        } else {
            return 'Pending Queue';
        }
    };

    const formatTransactionType = (params: any) => {
        if (params.value === 'auth_capture') {
            return 'Authorize & Capture';
        } else if (params.value == 'refund') {
            return 'Refund';
        } else {
            return 'Void';
        }
    };

    const selectionClear = () => {
        globalSearchGrid.cellParams = [];

        globalSearchGrid.cellSelected = false;
    }

    const selectionUpdate = (selectedRow: string[]) => {
        if (selectedRow.length === 1) {
            globalSearchGrid.cellSelected = true;

            globalSearchGrid.cellParams = selectedRow[0];
        } else {
            globalSearchGrid.cellParams = [];

            globalSearchGrid.cellSelected = false;
        }
    }

    return {
        cellInvoiceType,
        cellOrderStatus,
        cellParams,
        cellSelected,
        cellQueueStatus,
        cellQueueType,
        cellStatus,
        cellTransactionType,
        filterDate,
        filterDnsResults,
        filterString,
        formatDate,
        formatInvoiceAmount,
        formatInvoiceType,
        formatOrderStatus,
        formatQueueStatus,
        formatActiveStatus,
        formatInTestModeStatus,
        formatTransactionType,
        selectionClear,
        selectionUpdate
    };
};